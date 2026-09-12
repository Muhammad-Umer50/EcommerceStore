export interface AuthInterface {

}
export interface SigninResponseInterface{
  email:string,
  expiresAt:string,
  token:string
  cartId:string
}
export interface signupResponseInterface{
  email:string,
  expiresAt:string,
  token:string
  cartId:string
}
export interface loginInterface{
  email:string,
  password:string
}
export interface registerInterface{
  fullName:string
  email:string,
  password:string
}
