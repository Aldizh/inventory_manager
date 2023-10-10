import { useState } from 'react'

export const useInputChange = (data) => {
  const [input, setInput] = useState(data)

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  return [input, handleInputChange]
}