import ProfileForm from "@/components/forms/ProfileForm";
import FormLoader from "@/components/loaders/FormLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/models/profile";

type ProfileCardProps = {
    profile: Profile;
    isLoading: boolean;
};

const ProfileCard = ({ profile, isLoading }: ProfileCardProps) => {
    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <FormLoader isLoading={isLoading} skeletonRows={[2, 2, 1, 3]}>
                    <ProfileForm profile={profile} />
                </FormLoader>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
