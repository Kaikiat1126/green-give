import ChatContainer from "./chat-container"

export default async function Chat() {
  return (
    <div className="py-4 flex flex-col gap-y-2 max-h-screen mb-1">
      <ChatContainer />
    </div>
  )
}