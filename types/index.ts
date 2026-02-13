export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
  GUEST = "GUEST",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  teamId?: string;
  team?: Team;
  createdAt: Date;
  updatedAt: Date;
}

// Prisma User type (what comes from the database)
export type PrismaUser = {
  id: string;
  email: string;
  password: string; // Include password for backend use
  name: string;
  role: Role;
  teamId: string | null;
  team?: Team | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface Team {
  id: string;
  name: string;
  description?: string | null;
  code: string;
  members?: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (formData: FormData) => void;
  logout: () => void;
  hasPermission: (requiredRole: Role) => boolean;
}
