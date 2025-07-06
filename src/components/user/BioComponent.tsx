import type { User } from "../../types/User.ts";

type BioComponentProps = {
  user?: User | null;
};

function BioComponent({ user }: BioComponentProps) {
  if (user && user.bio) {
    return <p>{user.bio}</p>;
  } else {
    return null;
  }
}

export default BioComponent;
