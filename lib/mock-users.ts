import { MockUser } from "@/types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Sophia Chen",
    username: "sophiac",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    bio: "Fashion enthusiast. Coffee addict. Finding beauty in everyday things.",
    gumiCount: 342,
    followers: 12400,
    following: 891,
    hasStory: true,
  },
  {
    id: "user-2",
    name: "Liam Park",
    username: "liampark",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bio: "Interior design nerd. Minimalist with maximalist taste.",
    gumiCount: 218,
    followers: 8900,
    following: 445,
    hasStory: true,
  },
  {
    id: "user-3",
    name: "Olivia Rose",
    username: "oliviarose",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bio: "Skincare obsessed. Plant mom. Eternally browsing home decor.",
    gumiCount: 567,
    followers: 23100,
    following: 632,
    hasStory: true,
  },
  {
    id: "user-4",
    name: "Noah Kim",
    username: "noahkim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    bio: "Tech + design. Building things that look good and work well.",
    gumiCount: 156,
    followers: 5600,
    following: 312,
    hasStory: false,
  },
  {
    id: "user-5",
    name: "Emma Liu",
    username: "emmaliu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    bio: "Art director by day, pottery hobbyist by night.",
    gumiCount: 423,
    followers: 15800,
    following: 528,
    hasStory: true,
  },
  {
    id: "user-6",
    name: "Ava Martinez",
    username: "avamtz",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    bio: "Sustainable fashion advocate. Thrift queen.",
    gumiCount: 289,
    followers: 11200,
    following: 401,
    hasStory: true,
  },
  {
    id: "user-7",
    name: "James Wright",
    username: "jamesw",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    bio: "Outdoor gear reviewer. Weekend warrior. Coffee snob.",
    gumiCount: 198,
    followers: 7300,
    following: 267,
    hasStory: false,
  },
  {
    id: "user-8",
    name: "Isabella Torres",
    username: "isabellat",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    bio: "Beauty editor. Testing products so you don't have to.",
    gumiCount: 612,
    followers: 34500,
    following: 789,
    hasStory: true,
  },
  {
    id: "user-9",
    name: "Lucas Andersen",
    username: "lucasa",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    bio: "Scandinavian design lover. Less is more.",
    gumiCount: 134,
    followers: 4200,
    following: 198,
    hasStory: false,
  },
  {
    id: "user-10",
    name: "Charlotte Ng",
    username: "charlotteng",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    bio: "Foodie. Kitchen gadget hoarder. Recipe developer.",
    gumiCount: 345,
    followers: 19800,
    following: 567,
    hasStory: true,
  },
  {
    id: "user-11",
    name: "Ethan Brooks",
    username: "ethanb",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
    bio: "Sneakerhead turned fashion enthusiast.",
    gumiCount: 267,
    followers: 9100,
    following: 345,
    hasStory: true,
  },
  {
    id: "user-12",
    name: "Mia Johnson",
    username: "miaj",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
    bio: "Wellness coach. Yoga + skincare + good vibes.",
    gumiCount: 478,
    followers: 27600,
    following: 412,
    hasStory: true,
  },
];

// The current "logged in" user
export const CURRENT_USER: MockUser = {
  id: "user-me",
  name: "Tyler",
  username: "tyler",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  bio: "Discovering beautiful things.",
  gumiCount: 89,
  followers: 2400,
  following: 156,
  hasStory: false,
};

// Get random friends who Gumied a product
export function getRandomGumiFriends(count: number = 3): string[] {
  const shuffled = [...MOCK_USERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, Math.floor(Math.random() * 4))).map((u) => u.id);
}

// Lookup user by ID
export function getUserById(id: string): MockUser | undefined {
  if (id === CURRENT_USER.id) return CURRENT_USER;
  return MOCK_USERS.find((u) => u.id === id);
}

// Get users with stories (for the stories row)
export function getStoryUsers(): MockUser[] {
  return MOCK_USERS.filter((u) => u.hasStory);
}
