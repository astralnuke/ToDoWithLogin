import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: passwordHash
    })

    const userSaved = await newUser.save()

    const token = await createAccessToken({ id: userSaved.id })

    res.cookie('token', token)

    res.json({
      id: userSaved.id,
      uername: userSaved.username,
      email: userSaved.email
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!isMatch) return res.status(401).json({ message: 'Invalid credential' })

    const token = await createAccessToken({ id: userFound.id })

    res.cookie('token', token)

    res.json({
      id: userFound.id,
      uername: userFound.username,
      email: userFound.email
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.status(400).json({ message: 'User not found' })

  console.log(userFound)

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email
  })
}
