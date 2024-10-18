import conf from "../../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client)
        this.bucket = new Storage (this.client)
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
            alert(error)
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login:: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);    
        }
        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async userDetails(data) {
        try {
            const user = await this.getCurrentUser();
            if (user) {
                const userDatas = await this.databases.createDocument(
                    conf.appwriteDatabaseId, 
                    conf.appwriteCollectionId, 
                    user.$id,
                    {
                        Phone: data.phone,
                        Address: data.address,
                        userId : user.$id
                    }
                )
                return userDatas;
            } else {
                throw new Error('User is not logged in');   
            }
        } catch (error) {
            console.log("Appwrite service :: AddUserDetails :: error", error.message);
            alert(error.message);
        }
    }

    async getUserDetails() {
        try {
            const currentUser = await this.getCurrentUser();
            const userId = currentUser.$id;
            const userDocuments = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('userId', userId)]
            );
            console.log(userDocuments);
            if (userDocuments.total > 0) {
                return userDocuments.documents[0];
            } else {
                throw new Error("No user data found for this user.");
            }
        } catch (error) {
            console.log("Appwrite service :: getUserDetails :: error", error);
        }
    }

    async uploadFile(file) {
        try {
            
            const response = await this.bucket.createFile(
                conf.appwriteBucketId, 
                ID.unique(), 
                file
            );
            
            return response;
        } catch (error) {
            console.log("Error uploading file:", error);
        }
    };

    async storeFileMetadata(fileId, category, title, userId) {
        try {
            const metadata = await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteImageCollectionId, 
                ID.unique(),
                {
                    fileId: fileId,
                    category: category,
                    title: title,
                    userId: userId
                }
            );
            console.log(metadata);
            return metadata;
        } catch (error) {
            console.log("Error storing file metadata:", error);
        }
    };

    async uploadFileWithCategory(file, category, title, userId) {
        try {
            const fileResponse = await this.uploadFile(file); // Upload file
            if (fileResponse) {
                const metadata = await this.storeFileMetadata(fileResponse.$id, category, title, userId); // Store category metadata
                console.log("File and metadata stored successfully:", metadata);
            }
        } catch (error) {
            console.log("Error in uploadFileWithCategory:", error);
        }
    };
    async getCategories() {
        try {
            const currentUser = await this.getCurrentUser();
            const userId = currentUser.$id;
            const userDocs = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteImageCollectionId,
                [Query.equal('userId', userId)] 
            );
            const categories = [...new Set(userDocs.documents.map(doc => doc.category))];
            return categories;
        } catch (error) {
            console.log("Appwrite service :: getCategories :: error", error);
            throw error;
        }
    }
    
    
    async getDocuments(category) {
        try {
            const currentUser = await this.getCurrentUser();
            const userId = currentUser.$id;
            const userDocs = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteImageCollectionId,
                [Query.equal('userId', userId)] 
            );
            const filteredDocs = userDocs.documents.filter(doc => doc.category === category);
            console.log(filteredDocs);
            return filteredDocs;
            
        } catch (error) {
            console.log("Appwrite serive :: getDocuments :: error", error);
            throw error; 
        }
    }
    

    async getFile (fileId) {
        try {
            const result = this.bucket.getFileView(conf.appwriteBucketId, fileId);
            return result
        } catch (error) {
            console.log("Appwrite serive :: getFile :: error", error);
            throw error; 
        }
    }
     
    async updateDocument (documentId, category, title, userId){
        try {

            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteImageCollectionId, 
                documentId, 
                {
                    category: category,
                    title: title,
                    userId: userId
                }
            );
            
        } catch (error) {
            console.log("Appwrite service :: updateDocument :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService


