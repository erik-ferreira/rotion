import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ToC } from "../components/ToC";
import { Editor } from "../components/Editor";

export function Document() {
  const { id } = useParams<{ id: string }>();

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
        {!isFetching && data && <Editor content={initialContent} />}
      </section>
    </main>
  );
}
