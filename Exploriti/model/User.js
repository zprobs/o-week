class User {
 constructor(props) {
     if (typeof props === "object") {
         this.id = props.id;
         this.name = props.name;
         this.email = props.email;
         this.image = props.image;
     }
 }
}

export default User;
