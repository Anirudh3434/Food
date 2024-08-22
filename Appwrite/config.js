import { Client, Databases, ID, Storage } from 'appwrite';

const appWriteConfig = {
    endPoint: 'https://cloud.appwrite.io/v1',
    projectId: '66c0bde1001451bc70e4',
    dataBaseId: '66c0be55000459b91073',
    collectionId: '66c0be620022cb5c2e0a',
    bucketId: '66c0befa003e5c16b264',
    FavCollectionId : '66c193bd0021a9b2713a',
    CartCollectionId: '66c193af00248f988428'
};

class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(appWriteConfig.endPoint)
            .setProject(appWriteConfig.projectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost(dishName, price, image) {
        const data = {
            Dish_name: dishName,
            price: price,
            Image: image
        };

        try {
            const response = await this.database.createDocument(
                appWriteConfig.dataBaseId, 
                appWriteConfig.collectionId,
                ID.unique(),
                data
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async  addFav(id , email){
        const data = {
            items : id,
            email : email
        }
       try {
        const response = await this.database.createDocument(
            appWriteConfig.dataBaseId,
            appWriteConfig.FavCollectionId,
            ID.unique(),
            data)
            return response;
        
       } catch (error) {
        console.error(error)
       }
    }

    async  addCart(id , email){
        const data = {
            items : id,
            email : email
        }
       try {
        const response = await this.database.createDocument(
            appWriteConfig.dataBaseId,
            appWriteConfig.CartCollectionId,
            ID.unique(),
            data)
            return response;
        
       } catch (error) {
        console.error(error)
       }
    }


    async getAllPosts() {
        try {
            const response = await this.database.listDocuments(
                appWriteConfig.dataBaseId, 
                appWriteConfig.collectionId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllFavourite() {
        try {
            const response = await this.database.listDocuments(
                appWriteConfig.dataBaseId, 
                appWriteConfig.FavCollectionId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    
    async getAllCart() {
        try {
            const response = await this.database.listDocuments(
                appWriteConfig.dataBaseId, 
                appWriteConfig.CartCollectionId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    

    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(
                appWriteConfig.bucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getFilePreview(fileId) {
        try {
            const response = this.storage.getFilePreview(
                appWriteConfig.bucketId,
                fileId
            );
            return response.href;
        } catch (error) {
            throw error;
        }
    }
}

const service = new Service();

export default service;
