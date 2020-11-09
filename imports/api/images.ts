import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const ImagesCollection = new FilesCollection({
    storagePath: "assets/app/ouattesapp/uploads/Images",
    downloadRoute: "/files/images",
    permissions: 0o755,
    cacheControl: "public, max-age=31536000",
    collectionName: 'Images',
    allowClientCode: false, // disallow remove files from client
    onBeforeUpload(file){
        //allow upload files under 10mb, and only in png/jpg/jpeg formats
        if(file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Veuillez ajouter une image dont la taille est égale ou inférieure à 10MB';
    }
});

if(Meteor.isServer){
    Meteor.publish('images.all', function() {
        return ImagesCollection.find();
    });
    ImagesCollection.allowClient();
    Meteor.methods({
        "images.url" : function(_id:string){
            const Image = ImagesCollection.findOne(_id);
            const url:string = Image.link();
            return url;
        }
    })
}