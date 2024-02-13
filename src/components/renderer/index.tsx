import { BLOCKS } from "./blocks";
import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import { isErr, makeSafe, Result } from "@justmiracle/result";

export const BlockRenderer = (data: OutputBlockData) => {
  const Block = BLOCKS[data.type] || BLOCKS.default;

  return <Block {...data} />;
};

export const Article = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  const output = makeSafe(JSON.parse)(content) as Result<OutputData>;

  if (isErr(output)) {
    return <div>Error when parsing blocks</div>;
  }

  return (
    <article className={className}>
      {output.value.blocks.map(block => (
        <BlockRenderer key={block.id} {...block} />
      ))}
    </article>
  );
};
