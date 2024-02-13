"use client";

import { PropsWithChildren, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FatInput } from "@/components/ui/fat-input";
import { Label } from "@/components/ui/label";

import { WritePageContext } from "../page";
import { useQuickContext } from "@/contexts/quick";
import axios from "axios";
import { convert } from "html-to-text";
import { toast } from "sonner";

export const PublishArticleDialog = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { output } = useQuickContext<WritePageContext>();

  const title = useMemo(() => {
    const maybeTitle = output.blocks.find(block => block.type === "header");
    if (maybeTitle) {
      return convert(maybeTitle.data.text);
    }
  }, [output]);

  const description = useMemo(() => {
    const maybeDescription = output.blocks.find(
      block => block.type === "paragraph",
    );

    if (maybeDescription) {
      return convert(maybeDescription.data.text.slice(0, 160));
    }
  }, [output]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const body = {
      cover: "https://via.placeholder.com/150",
      title: data.title.toString(),
      description: data.description.toString(),
      content: JSON.stringify(output),
    };

    const result = await axios.post("/api/article", body);
    if (result.status === 201) {
      toast.success("Article published successfully");
      return router.push("/");
    } else {
      toast.error("Failed to publish article");
      console.error(result.data);
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="bg-white" />
      <DialogContent
        noOverlay
        className="border-0 shadow-none"
        onPointerDownOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Polish Your Article</DialogTitle>
          <DialogDescription>
            This determines how people will see your article on the platform.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label>Preview</Label>
            <div className="bg-secondary rounded-md aspect-video flex justify-center items-center">
              <span className="text-muted-foreground">
                Havent implement file upload yet, jam tich.
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <FatInput.Root>
                <FatInput.Label>Title</FatInput.Label>
                <FatInput.Input
                  required
                  autoFocus
                  name="title"
                  placeholder="Give it a cool title..."
                  className="text-base"
                  defaultValue={title}
                />
              </FatInput.Root>
            </div>

            <div className="space-y-1">
              <FatInput.Root>
                <FatInput.Label>Description</FatInput.Label>
                <FatInput.Textarea
                  required
                  minLength={10}
                  maxLength={166}
                  name="description"
                  className="max-h-28 min-h-28"
                  placeholder="A big blue cow jump over the cat..."
                  defaultValue={description}
                />
              </FatInput.Root>
            </div>

            <div className="flex justify-end gap-x-3 pt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Publish Now</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
