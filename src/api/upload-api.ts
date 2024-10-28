export const filesAPI = {
  async single(url: string, body: FormData) {
    const options = {
      method: 'POST',
      body,
    }
    try {
      const response = await fetch(url, options)
      const { data } = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },
}
