type CharactersResults = {
  characters: {
    results: {
      id: string,
      name: string,
      image: string,
      status: string,
      species: string,
      location: {
        name: string
      }
    }[]
  }
}