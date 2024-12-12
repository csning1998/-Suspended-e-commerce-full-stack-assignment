import User from "./postgres-models/user";
import ProductModel from "./mongo-models/product";

export default async function seed() {

    console.log("I am seed")
    // default root account
    await User.findOrCreate({
      where: {
          userId: "root",
      },
      defaults: {
          userPassword: "1qazXSW@",
          userEmail: "nephew.UncleRoger@noreply.gmail.com",
          userFamilyName: "root",
          userGivenName: "root",
          userPermission: "admin",
      },
  });


  // default products
  const testProduct = {
    title: 'test product',
    basePrice: 100
  }

  const test1 = await ProductModel.find(testProduct)

  if(test1.length == 0) {
    await ProductModel.create(testProduct)
  }
}
