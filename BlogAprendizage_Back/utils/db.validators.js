// Validar datos relacionados a la BD

import Hotel from '../src/hotel/hotel.model.js'
import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Service from '../src/service/service.model.js'  // Modelo Service
import Room from '../src/room/room.model.js'
import Invoice from '../src/invoice/invoice.model.js'

// Validar existencia de un hotel
export const existHotel = async (hotelId) => {
  if (!isValidObjectId(hotelId)) {
    throw new Error('Invalid hotel ObjectId')
  }
  const hotel = await Hotel.findById(hotelId)
  if (!hotel) {
    throw new Error('Hotel does not exist')
  }
}

// Validar existencia de un nombre de usuario (debe ser único para cada usuario)
export const existUsername = async (username, user) => {
  const alreadyUsername = await User.findOne({ username })
  if (alreadyUsername && alreadyUsername._id != user.uid) {
    console.error(`Username ${username} is already taken`)
    throw new Error(`Username ${username} is already taken`)
  }
}

// Validar existencia de un email (debe ser único para cada usuario)
export const existEmail = async (email, user) => {
  const alreadyEmail = await User.findOne({ email })
  if (alreadyEmail && alreadyEmail._id != user.uid) {
    console.error(`Email ${email} is already taken`)
    throw new Error(`Email ${email} is already taken`)
  }
}

// Verificar si el campo no es requerido
export const notRequiredField = (field) => {
  if (field) {
    throw new Error(`${field} is not required`)
  }
}

// Validar que el ID de un usuario exista
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
}

// Validar el tipo de pago (CASH o CARD)
export const validatePaymentType = (type) => {
  const valid = ['CASH', 'CARD']
  if (!type) {
    throw new Error('Type of payment is required')
  }
  if (!valid.includes(type)) {
    throw new Error('Invalid payment type. Must be CASH or CARD')
  }
}

export const existsNameHotel = async(nameHotel)=>{
  const existsHotel = await Hotel.findOne({nameHotel})
  if(existsHotel){
    console.error(`Hotel already Exists`)
    throw new Error(`Hotel already exists`)
  }
}