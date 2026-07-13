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
                    <ProfileForm
                        initialValues={{
                            firstName: profile?.firstName ?? "",
                            lastName: profile?.lastName ?? "",
                            phone: profile?.phone ?? "",
                            email: profile?.email ?? "",
                            address: profile?.address ?? "",
                            city: profile?.city ?? "",
                            state: profile?.state ?? "",
                            zip: profile?.zip ?? "",
                        }}
                    />
                </FormLoader>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
