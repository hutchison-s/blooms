import Book from "../models/Book.js";
import Concept from "../models/Concept.js"

const updates = [
  {
    "title": "The Giver",
    "author": "Lois Lowry",
    "genre": "Science Fiction",
    "slug": "the-giver",
    "synopsis": "In a seemingly utopian society devoid of pain and emotion, a young boy named Jonas is chosen to be the Receiver of Memory, uncovering the dark truths and hidden past of his community."
  },
  {
    "title": "The Outsiders",
    "author": "S.E. Hinton",
    "genre": "Realistic Fiction",
    "slug": "the-outsiders",
    "synopsis": "This novel explores the rivalry between two teenage gangs, the working-class Greasers and the affluent Socs, through the eyes of Ponyboy Curtis as he navigates loyalty, prejudice, and tragedy."
  },
  {
    "title": "Holes",
    "author": "Louis Sachar",
    "genre": "Adventure",
    "slug": "holes",
    "synopsis": "Stanley Yelnats IV is sent to a juvenile detention camp where he and other boys are forced to dig holes daily, leading him to uncover a generations-old family curse and a hidden treasure."
  },
  {
    "title": "The Lightning Thief",
    "author": "Rick Riordan",
    "genre": "Fantasy",
    "slug": "the-lightning-thief",
    "synopsis": "Percy Jackson discovers he is a demigod and embarks on a quest to clear his name and prevent a war among the Olympian gods, learning about his true heritage along the way."
  },
  {
    "title": "The Hunger Games",
    "author": "Suzanne Collins",
    "genre": "Dystopian",
    "slug": "the-hunger-games",
    "synopsis": "In a post-apocalyptic nation, sixteen-year-old Katniss Everdeen volunteers to take her sister's place in a televised fight to the death, forcing her to confront the tyrannical Capitol and its cruel games."
  },
  {
    "title": "Bud, Not Buddy",
    "author": "Christopher Paul Curtis",
    "genre": "Historical Fiction",
    "slug": "bud-not-buddy",
    "synopsis": "Set during the Great Depression, ten-year-old Bud Caldwell, an orphan, escapes his difficult foster home to search for the man he believes is his father, armed only with a suitcase of rules and flyers."
  },
  {
    "title": "Brown Girl Dreaming",
    "author": "Jacqueline Woodson",
    "genre": "Memoir",
    "slug": "brown-girl-dreaming",
    "synopsis": "This memoir in verse tells the story of Jacqueline Woodson's childhood in the 1960s and 1970s, exploring her experiences growing up Black in both Ohio and South Carolina and her journey to becoming a writer."
  },
  {
    "title": "Amal Unbound",
    "author": "Aisha Saeed",
    "genre": "Contemporary Fiction",
    "slug": "amal-unbound",
    "synopsis": "Amal's dream of becoming a teacher is shattered when she is forced into indentured servitude to pay off a family debt, but she secretly schemes for freedom and education."
  },
  {
    "title": "Barakah Beats",
    "author": "Maleeha Siddiqui",
    "genre": "Contemporary Fiction",
    "slug": "barakah-beats",
    "synopsis": "When Nimra joins a band to try and fit in at her new school, she struggles to balance her love for music with her conservative Muslim values and family expectations."
  },
  {
    "title": "More to the Story",
    "author": "Hena Khan",
    "genre": "Contemporary Fiction",
    "slug": "more-to-the-story",
    "synopsis": "Inspired by 'Little Women,' this novel follows four Pakistani-American sisters as they navigate family challenges, personal growth, and the ups and downs of their everyday lives."
  },
  {
    "title": "All My Rage",
    "author": "Sabaa Tahir",
    "genre": "Young Adult Fiction",
    "slug": "all-my-rage",
    "synopsis": "Childhood best friends Salahudin and Noor grapple with immense grief, fractured families, and their complicated relationship in a story that spans generations and continents."
  },
  {
    "title": "Queen of the Tiles",
    "author": "Hanna Alkaf",
    "genre": "Mystery",
    "slug": "queen-of-the-tiles",
    "synopsis": "After the reigning Scrabble queen, Najwa, dies suddenly, her best friend, Fana, investigates what truly happened, uncovering secrets and conspiracies within the competitive world of competitive Scrabble."
  },
  {
    "title": "Perfectly Parvin",
    "author": "Olivia Abtahi",
    "genre": "Contemporary Fiction",
    "slug": "perfectly-parvin",
    "synopsis": "Iranian-American Parvin Mohammadi tries to find her place and navigate the awkwardness of middle school, dealing with crushes, friendships, and her cultural identity."
  },
  {
    "title": "The Henna Wars",
    "author": "Adiba Jaigirdar",
    "genre": "Contemporary Fiction",
    "slug": "the-henna-wars",
    "synopsis": "Nishat is out to her parents and in love with henna, but when a new girl, Flávia, opens a rival henna business and turns out to be her crush, things get complicated."
  },
  {
    "title": "Free Lunch",
    "author": "Rex Ogle",
    "genre": "Memoir",
    "slug": "free-lunch",
    "synopsis": "Rex Ogle recounts his challenging sixth-grade year, navigating poverty, hunger, and bullying while trying to keep his struggles hidden from his classmates who receive free lunch."
  },
  {
    "title": "Black Brother, Black Brother",
    "author": "Jewell Parker Rhodes",
    "genre": "Contemporary Fiction",
    "slug": "black-brother-black-brother",
    "synopsis": "Two brothers, one light-skinned and one dark-skinned, face racial prejudice and injustice, leading Donte to learn fencing as a way to fight back against systemic racism."
  },
  {
    "title": "Clean Getaway",
    "author": "Nic Stone",
    "genre": "Adventure",
    "slug": "clean-getaway",
    "synopsis": "Scoob's spring break takes an unexpected turn when his Grandma G. takes him on an epic road trip, revealing family secrets and revisiting significant moments in civil rights history."
  },
  {
    "title": "The Revolution of Evelyn Serrano",
    "author": "Sonia Manzano",
    "genre": "Historical Fiction",
    "slug": "the-revolution-of-evelyn-serrano",
    "synopsis": "Set in 1969, Evelyn Serrano's summer in Spanish Harlem is transformed when her activist aunt comes to stay, drawing Evelyn into the Puerto Rican civil rights movement."
  },
  {
    "title": "145th Street: Short Stories",
    "author": "Walter Dean Myers",
    "genre": "Short Stories",
    "slug": "145th-street-short-stories",
    "synopsis": "This collection of interconnected short stories vividly portrays the lives, struggles, and triumphs of the residents of a vibrant, diverse neighborhood in Harlem."
  },
  {
    "title": "The Magic Fish",
    "author": "Trung Le Nguyen",
    "genre": "Graphic Novel",
    "slug": "the-magic-fish",
    "synopsis": "Tiên struggles to communicate with his Vietnamese immigrant parents about being gay, finding common ground through sharing fairy tales and folktales."
  },
  {
    "title": "The Crossover",
    "author": "Kwame Alexander",
    "genre": "Sports Fiction",
    "slug": "the-crossover",
    "synopsis": "Told in verse, this novel follows basketball-loving twin brothers Josh and Jordan Bell as they navigate family bonds, first crushes, and the challenges of growing up on and off the court."
  },
  {
    "title": "Chains",
    "author": "Laurie Halse Anderson",
    "genre": "Historical Fiction",
    "slug": "chains",
    "synopsis": "During the American Revolutionary War, Isabel, an enslaved teenager, seeks freedom for herself and her younger sister while spying on the Loyalists for the Patriot cause in New York City."
  },
  {
    "title": "The Storm Runner",
    "author": "J.C. Cervantes",
    "genre": "Fantasy",
    "slug": "the-storm-runner",
    "synopsis": "Having a physical disability, Zane discovers he is a demigod descended from Maya gods and embarks on a dangerous quest to prevent an ancient evil from destroying the world."
  },
  {
    "title": "Aru Shah and the End of Time",
    "author": "Roshani Chokshi",
    "genre": "Fantasy",
    "slug": "aru-shah-and-the-end-of-time",
    "synopsis": "Aru Shah accidentally unleashes a sleeping demon, revealing she is a reincarnated Pandava, and must embark on a quest through the Kingdom of Death to save the world."
  },
  {
    "title": "A Tale of Magic...",
    "author": "Chris Colfer",
    "genre": "Fantasy",
    "slug": "a-tale-of-magic",
    "synopsis": "Brystal Evergreen, a young girl living in a kingdom where magic is outlawed, discovers a hidden library and a secret school of magic, setting her on a path to uncover the truth about her world."
  },
  {
    "title": "Artemis Fowl",
    "author": "Eoin Colfer",
    "genre": "Fantasy",
    "slug": "artemis-fowl",
    "synopsis": "Twelve-year-old criminal mastermind Artemis Fowl attempts to steal gold from fairies, entering into a fantastical battle of wits and technology with the hidden magical world."
  },
  {
    "title": "Force of Fire",
    "author": "Sayantani DasGupta",
    "genre": "Fantasy",
    "slug": "force-of-fire",
    "synopsis": "When a demon takes over her sister, Kiranmala, a reluctant demon princess, must journey through the fantastical land of the Kingdom Beyond to save her family and uncover her true powers."
  },
  {
    "title": "The Isle of the Lost",
    "author": "Melissa de la Cruz",
    "genre": "Fantasy",
    "slug": "the-isle-of-the-lost",
    "synopsis": "This prequel to the Disney 'Descendants' series explores the lives of the teenage children of notorious Disney villains living on the Isle of the Lost, who are offered a chance at redemption."
  },
  {
    "title": "The City of Ember",
    "author": "Jeanne DuPrau",
    "genre": "Science Fiction",
    "slug": "the-city-of-ember",
    "synopsis": "In a dying underground city reliant on fading lights, two teenagers, Lina and Doon, race against time to decipher an ancient message they believe holds the key to humanity's survival."
  },
  {
    "title": "96 Miles",
    "author": "J.L. Esplin",
    "genre": "Adventure",
    "slug": "96-miles",
    "synopsis": "Brothers John and Stew are left stranded in the Nevada desert after a massive power outage, forcing them to embark on a desperate 96-mile journey to find their family and survival."
  },
  {
    "title": "Ranger's Apprentice: The Ruins of Gorlan",
    "author": "John Flanagan",
    "genre": "Fantasy",
    "slug": "rangers-apprentice-the-ruins-of-gorlan",
    "synopsis": "Orphaned Will is chosen to be an apprentice to the mysterious Rangers, where he learns skills of tracking, archery, and stealth, while uncovering a dark plot against the kingdom."
  },
  {
    "title": "The List",
    "author": "Patricia Forde",
    "genre": "Dystopian",
    "slug": "the-list",
    "synopsis": "In a future world where language is restricted to only 500 words, Letta, a wordsmith, discovers the true power of words and must choose between conformity and rebellion to save human expression."
  },
  {
    "title": "The Graveyard Book",
    "author": "Neil Gaiman",
    "genre": "Fantasy",
    "slug": "the-graveyard-book",
    "synopsis": "After his family is murdered, a baby boy named Nobody Owens is adopted and raised by ghosts and supernatural beings in a graveyard, learning valuable lessons about life and death from the deceased."
  },
  {
    "title": "Charlie Thorne and the Last Equation",
    "author": "Stuart Gibbs",
    "genre": "Adventure",
    "slug": "charlie-thorne-and-the-last-equation",
    "synopsis": "Twelve-year-old genius Charlie Thorne is recruited by the CIA to solve a baffling equation left by a deceased notorious terrorist, leading her on a thrilling global chase."
  },
  {
    "title": "The Strangers",
    "author": "Margaret Peterson Haddix",
    "genre": "Science Fiction",
    "slug": "the-strangers",
    "synopsis": "When a mysterious family appears in their neighborhood, siblings Emma and Jonny discover they are involved in a secret experiment, leading them to uncover hidden truths about their own lives."
  },
  {
    "title": "Stormbreaker",
    "author": "Anthony Horowitz",
    "genre": "Adventure",
    "slug": "stormbreaker",
    "synopsis": "After his uncle's suspicious death, fourteen-year-old Alex Rider is recruited by MI6 and forced into the dangerous world of espionage, uncovering a plot involving a new computer system."
  },
  {
    "title": "Redwall",
    "author": "Brian Jacques",
    "genre": "Fantasy",
    "slug": "redwall",
    "synopsis": "Young mouse Matthias must rise to the challenge to defend Redwall Abbey and its peaceful inhabitants from the invading warlord rat, Cluny the Scourge, embarking on a quest to find a legendary sword."
  },
  {
    "title": "The Lions of Little Rock",
    "author": "Kristin Levine",
    "genre": "Historical Fiction",
    "slug": "the-lions-of-little-rock",
    "synopsis": "Set in 1958 Little Rock, Arkansas, a shy white girl named Marlee forms an unlikely friendship with a confident Black girl named Liz, as they navigate the complexities of school integration and the Civil Rights Movement."
  },
  {
    "title": "The Merchant of Death",
    "author": "D.J. MacHale",
    "genre": "Fantasy",
    "slug": "the-merchant-of-death",
    "synopsis": "Bobby Pendragon, an ordinary teenager, discovers he is a Traveler with the ability to move between dimensions, embarking on a dangerous mission to save various territories from a dark force."
  },
  {
    "title": "Tristan Strong Punches a Hole in the Sky",
    "author": "Kwame Mbalia",
    "genre": "Fantasy",
    "slug": "tristan-strong-punches-a-hole-in-the-sky",
    "synopsis": "After accidentally punching a hole into the sky, Tristan Strong is pulled into a world where African American folktales and West African myths come to life, forcing him to confront his grief and find his inner strength."
  },
  {
    "title": "The Unwanteds",
    "author": "Lisa McMann",
    "genre": "Fantasy",
    "slug": "the-unwanteds",
    "synopsis": "In a dystopian society where creativity is punishable by death, 'Unwanteds' are sent to the Great Lake of Boiling Oil, only to discover a secret, magical world called Artime, where they are taught to use their artistic talents as weapons."
  },
  {
    "title": "The Stars Beneath Our Feet",
    "author": "David Barclay Moore",
    "genre": "Contemporary Fiction",
    "slug": "the-stars-beneath-our-feet",
    "synopsis": "After the death of his older brother, Lolly, a quiet boy, finds solace and builds a fantastical world with Legos, navigating grief, gang violence, and finding his place in his Harlem neighborhood."
  },
  {
    "title": "Bloom",
    "author": "Kenneth Oppel",
    "genre": "Science Fiction",
    "slug": "bloom",
    "synopsis": "When black rain falls, a new alien plant life emerges that rapidly consumes everything, and a group of teenagers discover they have a strange connection to these invasive plants, giving them unique and terrifying abilities."
  },
  {
    "title": "Hatchet",
    "author": "Gary Paulsen",
    "genre": "Adventure",
    "slug": "hatchet",
    "synopsis": "Thirteen-year-old Brian Robeson must survive in the Canadian wilderness after a plane crash, armed only with a hatchet and his wits, learning to adapt and endure against nature's challenges."
  },
  {
    "title": "Eragon",
    "author": "Christopher Paolini",
    "genre": "Fantasy",
    "slug": "eragon",
    "synopsis": "A farm boy named Eragon discovers a mysterious stone that hatches into a dragon, thrusting him into a perilous journey to become a Dragon Rider and fight against the tyrannical king."
  },
  {
    "title": "Ghost",
    "author": "Jason Reynolds",
    "genre": "Sports Fiction",
    "slug": "ghost",
    "synopsis": "Castle 'Ghost' Cranshaw, a troubled but talented kid, finds an outlet for his anger and energy by joining an elite track team, learning about discipline, teamwork, and facing his past."
  },
  {
    "title": "Race to the Sun",
    "author": "Rebecca Roanhorse",
    "genre": "Fantasy",
    "slug": "race-to-the-sun",
    "synopsis": "Based on Navajo mythology, Nizhoni Begay discovers she's a Monster Slayer and must embark on a dangerous quest with her brother to rescue their father from a monster and prevent the end of the world."
  },
  {
    "title": "Counting by 7s",
    "author": "Holly Goldberg Sloan",
    "genre": "Contemporary Fiction",
    "slug": "counting-by-7s",
    "synopsis": "After her adoptive parents die in a car accident, quirky and brilliant twelve-year-old Willow Chance must navigate the world, unexpectedly forming a new, unconventional family with those around her."
  },
  {
    "title": "Peak",
    "author": "Roland Smith",
    "genre": "Adventure",
    "slug": "peak",
    "synopsis": "Teenager Peak Marcello is given a chance to avoid juvenile detention by attempting to be the youngest person to summit Mount Everest, facing treacherous conditions and moral dilemmas on his climb."
  },
  {
    "title": "The Alchemyst: The Secrets of the Immortal Nicholas Flamel",
    "author": "Michael Scott",
    "genre": "Fantasy",
    "slug": "the-alchemyst-the-secrets-of-the-immortal-nicholas-flamel",
    "synopsis": "Twins Josh and Sophie discover they are caught in an ancient war between immortal beings when they encounter Nicholas Flamel, the legendary alchemist, and learn they possess magical auras vital to saving the world."
  },
  {
    "title": "The Hate U Give",
    "author": "Angie Thomas",
    "genre": "Contemporary Fiction",
    "slug": "the-hate-u-give",
    "synopsis": "Starr Carter witnesses the fatal shooting of her unarmed best friend by a police officer, forcing her to navigate between her two worlds—her poor, predominantly Black neighborhood and her wealthy, mostly white prep school—as she seeks justice."
  },
  {
    "title": "The Inquisitor's Tale",
    "author": "Adam Gidwitz",
    "genre": "Historical Fiction",
    "slug": "the-inquisitors-tale",
    "synopsis": "Set in medieval France, three children with unusual powers—a peasant girl with visions, a Jewish boy with a healing dog, and a monk who can summon demons—are brought together by fate and pursued by the Church."
  }
]
const newDocs = [];

export async function clean(req, res) {
    try {
        const proms = []
        for (const doc of updates) {
            proms.push(Book.updateOne({slug: doc.slug}, {
                synopsis: doc.synopsis
            }))
        }
        const results = await Promise.all(proms);
        return res.status(200).json({message: 'Data is clean', data: results})
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}


export async function seed(req, res) {

        const response = await Book.insertMany(newDocs, {ordered: false});
        return res.status(200).json(response);

}