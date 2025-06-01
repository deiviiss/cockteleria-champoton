'use server'

export async function getPhoneNumber() {
  try {
    const phoneNumber = '+5219811250049'

    if (!phoneNumber) {
      return null
    }

    return phoneNumber
  } catch (error) {
    console.error('Error fetching phone number:', error)
    return null
  }
}