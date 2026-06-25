import ProfileForm from "@/components/forms/ProfileForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Profile } from "@/models/profile";

type ProfileCardProps = {
    profile: Profile;
};

const ProfileCard = ({
    profile
}: ProfileCardProps) => {
    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <CardTitle>
                        Profile
                    </CardTitle>
                </CardHeader>
                <ProfileForm
                    profile={profile}
                />
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
