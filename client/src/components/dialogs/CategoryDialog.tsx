import CategoryForm from "@/components/forms/CategoryForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/models/category";

type CategoryDialogProps = React.ComponentProps<typeof Dialog> & {
    category: Category | null;
};

const CategoryDialog = ({
    open,
    onOpenChange,
    category,
    ...props
}: CategoryDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...props}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {category?.categoryId ? "Update" : "Add"} Category
                    </DialogTitle>
                </DialogHeader>
                <CategoryForm
                    category={category}
                    onSubmit={() => onOpenChange?.(false)}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CategoryDialog;
