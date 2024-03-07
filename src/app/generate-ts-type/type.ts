type GeneratedType = {
  abilities: Array<
    | {
        ability: { name: string; url: string }
        isHidden: undefined
        slot: number
      }
    | {
        ability: { name: string; url: string }
        isHidden: boolean
        slot: number
      }
  >
  baseExperience: number
  forms: Array<{ name: string; url: string }>
  gameIndices: Array<{
    gameIndex: number
    version: { name: string; url: string }
  }>
  height: number
  heldItems: Array<unknown>
  id: number
  isDefault: boolean
  locationAreaEncounters: string
  moves: Array<
    | {
        move: { name: string; url: string }
        versionGroupDetails: Array<
          | {
              levelLearnedAt: undefined
              moveLearnMethod: { name: string; url: string }
              versionGroup: { name: string; url: string }
            }
          | {
              levelLearnedAt: number
              moveLearnMethod: { name: string; url: string }
              versionGroup: { name: string; url: string }
            }
        >
      }
    | {
        move: { name: string; url: string }
        versionGroupDetails: Array<
          | {
              levelLearnedAt: number
              moveLearnMethod: { name: string; url: string }
              versionGroup: { name: string; url: string }
            }
          | {
              levelLearnedAt: undefined
              moveLearnMethod: { name: string; url: string }
              versionGroup: { name: string; url: string }
            }
        >
      }
    | {
        move: { name: string; url: string }
        versionGroupDetails: Array<{
          levelLearnedAt: undefined
          moveLearnMethod: { name: string; url: string }
          versionGroup: { name: string; url: string }
        }>
      }
    | {
        move: { name: string; url: string }
        versionGroupDetails: Array<{
          levelLearnedAt: number
          moveLearnMethod: { name: string; url: string }
          versionGroup: { name: string; url: string }
        }>
      }
  >
  name: string
  order: number
  pastAbilities: Array<unknown>
  pastTypes: Array<unknown>
  species: { name: string; url: string }
  sprites: {
    backDefault: string
    backFemale: string
    backShiny: string
    backShinyFemale: string
    frontDefault: string
    frontFemale: string
    frontShiny: string
    frontShinyFemale: string
    other: {
      dreamWorld: { frontDefault: string; frontFemale: undefined }
      home: {
        frontDefault: string
        frontFemale: string
        frontShiny: string
        frontShinyFemale: string
      }
      officialArtwork: { frontDefault: string; frontShiny: string }
      showdown: {
        backDefault: string
        backFemale: string
        backShiny: string
        backShinyFemale: undefined
        frontDefault: string
        frontFemale: string
        frontShiny: string
        frontShinyFemale: string
      }
    }
    versions: {
      generationI: {
        redBlue: {
          backDefault: string
          backGray: string
          backTransparent: string
          frontDefault: string
          frontGray: string
          frontTransparent: string
        }
        yellow: {
          backDefault: string
          backGray: string
          backTransparent: string
          frontDefault: string
          frontGray: string
          frontTransparent: string
        }
      }
      generationIi: {
        crystal: {
          backDefault: string
          backShiny: string
          backShinyTransparent: string
          backTransparent: string
          frontDefault: string
          frontShiny: string
          frontShinyTransparent: string
          frontTransparent: string
        }
        gold: {
          backDefault: string
          backShiny: string
          frontDefault: string
          frontShiny: string
          frontTransparent: string
        }
        silver: {
          backDefault: string
          backShiny: string
          frontDefault: string
          frontShiny: string
          frontTransparent: string
        }
      }
      generationIii: {
        emerald: { frontDefault: string; frontShiny: string }
        fireredLeafgreen: {
          backDefault: string
          backShiny: string
          frontDefault: string
          frontShiny: string
        }
        rubySapphire: {
          backDefault: string
          backShiny: string
          frontDefault: string
          frontShiny: string
        }
      }
      generationIv: {
        diamondPearl: {
          backDefault: string
          backFemale: undefined
          backShiny: string
          backShinyFemale: undefined
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
        heartgoldSoulsilver: {
          backDefault: string
          backFemale: string
          backShiny: string
          backShinyFemale: string
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
        platinum: {
          backDefault: string
          backFemale: string
          backShiny: string
          backShinyFemale: string
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
      }
      generationV: {
        blackWhite: {
          animated: {
            backDefault: string
            backFemale: string
            backShiny: string
            backShinyFemale: string
            frontDefault: string
            frontFemale: string
            frontShiny: string
            frontShinyFemale: string
          }
          backDefault: string
          backFemale: string
          backShiny: string
          backShinyFemale: string
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
      }
      generationVi: {
        omegarubyAlphasapphire: {
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
        xY: {
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
      }
      generationVii: {
        icons: { frontDefault: string; frontFemale: undefined }
        ultraSunUltraMoon: {
          frontDefault: string
          frontFemale: string
          frontShiny: string
          frontShinyFemale: string
        }
      }
      generationViii: {
        icons: { frontDefault: string; frontFemale: undefined }
      }
    }
  }
  stats: Array<
    | {
        baseStat: number
        effort: undefined
        stat: { name: string; url: string }
      }
    | { baseStat: number; effort: number; stat: { name: string; url: string } }
  >
  types: Array<{ slot: number; type: { name: string; url: string } }>
  weight: number
}
