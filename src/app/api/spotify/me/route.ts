import { getUserProfile } from '@/lib/spotify-user';
import { withAuthHandler } from "@/lib/with-auth-handler";

export const GET = withAuthHandler(getUserProfile);
