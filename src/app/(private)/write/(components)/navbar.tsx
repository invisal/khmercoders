import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ProfileDropdown } from "@/components/navbar/profile-dropdown";

import { WritePageContext } from "../page";
import { PublishArticleDialog } from "./publish-article-dialog";
import { useQuickContext } from "@/contexts/quick";

export const Navbar = () => {
  const { isSaving } = useQuickContext<WritePageContext>();

  return (
    <nav className="flex items-center justify-between gap-x-5 py-3">
      <div className="flex gap-x-4 items-center">
        <Logo />
        {isSaving ? <span>Saving...</span> : <span>Saved</span>}
      </div>
      <div className="flex items-center gap-x-5">
        <PublishArticleDialog>
          <Button>Publish Article</Button>
        </PublishArticleDialog>

        <ProfileDropdown />
      </div>
    </nav>
  );
};
