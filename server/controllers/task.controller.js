import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  console.log(tasks)
  res.json(tasks)
}

export const getTask = async (req, res) => {
  const { id } = req.params

  const findedTask = await Task.findById(id, {
    user: req.user.id
  }).populate('user')

  if (!findedTask) return res.status(404).json({ message: 'Task not found' })

  res.json(findedTask)
}

export const createTask = async (req, res) => {
  const { title, description, date } = req.body

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
  })

  const savedTask = await newTask.save()
  res.json(savedTask)
}

export const deleteTask = async (req, res) => {
  const { id } = req.params

  const findedTask = await Task.findByIdAndDelete(id)

  if (!findedTask) return res.status(404).json({ message: 'Task not found' })

  res.status(204)
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, date } = req.body

  const findedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, date },
    { new: true }
  )

  if (!findedTask) return res.status(404).json({ message: 'Task not found' })

  res.json(findedTask)
}
