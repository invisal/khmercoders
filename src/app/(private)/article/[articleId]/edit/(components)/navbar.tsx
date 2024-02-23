import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ProfileDropdown } from "@/components/navbar/profile-dropdown";

import { EditPageContext } from "../page";
import { UpdateArticleDialog } from "./update-article-dialog";
import { useQuickContext } from "@/contexts/quick";

export const Navbar = () => {
  const { isSaving } = useQuickContext<EditPageContext>();

  return (
    <nav className="flex items-center justify-between gap-x-5 py-3">
      <div className="flex items-center gap-x-4">
        <Logo />
        {isSaving ? <span>Saving...</span> : <span>Saved</span>}
      </div>
      <div className="flex items-center gap-x-5">
        <UpdateArticleDialog>
          <Button>Update Article</Button>
        </UpdateArticleDialog>

        <ProfileDropdown />
      </div>
    </nav>
  );
};
