type CharacterResponse = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: LocationCharacterResponse
  location: LocationCharacterResponse
  image: string
  episode: string[]
  url: string
  created: Date
}

type LocationCharacterResponse = {
  name: string
  url: string
}
