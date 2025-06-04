export interface AuthContextType{
    isAuthenticated:boolean;
    login:(token:string)=>void;
    logout:()=>void;
}

// defines the shape of our auth context so we get proper typechecking in components 