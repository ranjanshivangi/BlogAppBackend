class Blog {    
    constructor(userId, userName, title, description, image, category){
      this.userName = userName;
      this.userId = userId;
      this.title = title
      this.description = description;
      this.image = image;
      this.category = category;
      this.time = new Date();
    }         
}
export default Blog