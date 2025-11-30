import { Textarea } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const messages = [
    { id: 1, content: "Olá! Como posso ajudar?", role: "model" },
    { id: 2, content: "Quero montar um layout de chat!", role: "user" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "user" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
  ];

  return (
    <main className="max-w-full h-full flex flex-col justify-between">
      <section className="w-7/8 mx-auto pb-20">
        <ScrollShadow className="flex flex-col gap-2 p-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`
                max-w-[60%]
                ${msg.role === "user" ? "ml-auto" : "mr-auto"}
                ${msg.role === "user" ? "bg-primary text-white" : ""}
              `}
            >
              <CardBody>
                <p>{msg.content}</p>
              </CardBody>
            </Card>
          ))}
        </ScrollShadow>
      </section>

      <section className="fixed bottom-0 w-3/4 lg:w-5/8 flex justify-center py-4 border-t border-default-200">
        <Textarea
          className="w-3/4 lg:w-5/8"
          endContent={<Button isIconOnly color="primary" />}
          minRows={2}
          placeholder="Digite sua mensagem..."
          size="lg"
        />
      </section>
    </main>
  );
}
