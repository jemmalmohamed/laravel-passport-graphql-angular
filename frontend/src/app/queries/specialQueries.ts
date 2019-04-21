import gql from 'graphql-tag';




export const SPECIAL_QUERY = gql`
  query special($id:ID!) { 
  special(id :$id){
    id
    name
    comment
  }
  }`;


export const SPECIALS_QUERY = gql`
  query specials{
  specials{
     id
    name
    comment
  }
  }`;




export const MUTATION_CREATE_EVENT = gql`
    mutation CreateEvent(
        $name:String ,
        $description: String,
       ){
      CreateEvent(
        name: $name ,
        description: $description,
        ){
          id
    name
    description
      }
    }
  `;








export const MUTATION_UPDATE_EVENT = gql`
mutation UpdateEvent(
        $id: ID!,
        $description: String,
  ){
  UpdateEvent(
        id: $id,
                description: $description,
    ){
    id
    description
  }
}
`;



export const DELETE_INSTITUTION_MUTATION = gql`
mutation deleteInstitution($id: ID!){
  deleteInstitution(id: $id){
    id
    name
  }
} `;



///////////////   INSTITUTION  CATEGORY //////////////////////////

export const CATEGORY_QUERY = gql`
query category($id: ID!) {
  categoryById(id : $id){
    id
    name
  }
} `;





export const INSTITUTION_CATEGORIES_QUERY = gql`
query institutionCategories{
  institutionCategories{
    id
    name
  }
} `;

export const MUTATION_CREATE_INSTITUTION_CATEGORY = gql`
mutation CreateInstitutionCategory($name: String){
  CreateInstitutionCategory(name: $name){
    id
    name
  }
}
`;

export const MUTATION_UPDATE_INSTITUTION_CATEGORY = gql`
mutation UpdateInstitutionCategory($id: ID!, $name: String){
  UpdateInstitutionCategory(id: $id, name: $name){
    id
    name
  }
}
`;



export const DELETE_INSTITUTION_CATEGORY_MUTATION = gql`
mutation deleteInstitutionCategory($id: ID!){
  deleteInstitutionCategory(id: $id){
    id
    name
  }
} `;











