
import { isValidObjectId } from 'mongoose'

export const findUser = async (id) => {
  try {
    const userExist = await User.findById(id)
    if (!userExist) return false
    return userExist
  } catch (err) {
    console.error(err)
    return false
  }
}

// Validar que un ObjectId sea válido
export const objectIdValid = (objectId) => {
  if (!isValidObjectId(objectId)) {
    throw new Error(`The value of field is not a valid ObjectId`)
  }
}

export const existsNameHotel = async(nameHotel)=>{
  const existsHotel = await Hotel.findOne({nameHotel})
  if(existsHotel){
    console.error(`Hotel already Exists`)
    throw new Error(`Hotel already exists`)
  }
}