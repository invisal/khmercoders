"use client";

import { PropsWithChildren, useMemo } from "react";
import Image from "next/image";
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

import { EditPageContext } from "../page";
import { useQuickContext } from "@/contexts/quick";
import { convert } from "html-to-text";
import { toast } from "sonner";

export const UpdateArticleDialog = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { output, article } = useQuickContext<EditPageContext>();

  const title = useMemo(() => {
    const maybeTitle = output.blocks.find((block) => block.type === "header");
    if (maybeTitle) {
      return convert(maybeTitle.data.text);
    }
  }, [output]);

  const description = useMemo(() => {
    const maybeDescription = output.blocks.find(
      (block) => block.type === "paragraph",
    );

    if (maybeDescription) {
      return convert(maybeDescription.data.text.slice(0, 160));
    }
  }, [output]);

  const cover = useMemo(() => {
    const maybeCover = output.blocks.find((block) => block.type === "image");
    if (maybeCover) {
      return maybeCover.data.file.url;
    }
  }, [output]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const body = {
      ...article,
      cover: cover,
      title: data.title.toString(),
      description: data.description.toString(),
      content: JSON.stringify(output),
    };

    try {
      const response = await fetch(`/api/article/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast.success("Article updated successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update article");
      console.error("Error:", error);
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="bg-background" />
      <DialogContent
        noOverlay
        className="border-0 shadow-none"
        onPointerDownOutside={(e) => e.preventDefault()}
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
            <div className="flex aspect-video items-center justify-center rounded-md bg-secondary">
              <Image
                src={cover}
                alt="cover"
                width={0}
                height={0}
                sizes="100%"
                className="size-full rounded-md"
              />
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
              <Button type="submit">Update Now</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
