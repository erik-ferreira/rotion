import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Document as IPCDocument } from "@/shared/types/ipc";

import { ToC } from "../components/ToC";
import { Editor, OnContentUpdatedParams } from "../components/Editor";

export function Document() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery(["document", id], async () => {
    // eslint-disable-next-line prettier/prettier
    const response = await window.api.fetchDocument({ id: id! });

    return response.data;
  });

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? "<p></p>"}`;
    }

    return "";
  }, [data]);

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({ id: id!, title, content });
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueriesData<IPCDocument[]>(
          ["documents"],
          (documents) => {
            return documents?.map((document) => {
              if (document?.id === id) {
                return { ...document, title };
              }

              return document;
            });
          }
        );
      },
    }
  );

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, content });
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Front-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Estilização</ToC.Link>
            <ToC.Link>Acessibilidade</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  );
}
