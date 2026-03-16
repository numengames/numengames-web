<script>
	import { onMount } from "svelte";

	let isVisible = false;
	let aiAgentName = "Procyon";
	let input = "";
	let isLoading = false;
	let conversationId = null;
	let messages = [
		{
			type: "ai",
			text: `Gm! I'm a Digital Agent named ${aiAgentName}, How can I assist you today?`,
		},
	];

	const config = {
		integrationsApi: {
			baseUrl: "https://integrations-api.numinia.xyz/api",
			actions: {
				createAIConversation: {
					url: "/v1/conversation/",
				},
				handleAIAssistantConversation: {
					url: "/v1/openai/conversation/assistant/text/",
				},
			},
		},
	};

	onMount(() => {
		createConversation();
	});

	async function createConversation() {
		conversationId = `conversation_${Date.now()}`;
		const { baseUrl, actions } = config.integrationsApi;
		const { url: apiPath } = actions.createAIConversation;

		const finalUrl = `${baseUrl}${apiPath}`;
		const headers = { "Content-Type": "application/json;charset=UTF-8" };
		const params = {
			headers,
			body: JSON.stringify({
				origin: "web",
				conversationId,
				type: "chatgpt",
				name: conversationId,
				assistant: {
					name: "Procyon Web",
					id: "asst_oU2hZRs1Asxkoq1GNCAkmgQ2",
				},
			}),
		};

		try {
			await fetch(finalUrl, { method: "POST", ...params });
		} catch (error) {
			console.error("Error creating conversation:", error);
		}
	}

	async function handleSendMessage() {
		const userMessage = input.trim();
		if (userMessage && conversationId) {
			messages = [...messages, { type: "user", text: userMessage }];
			input = "";
			isLoading = true;

			try {
				const response = await handleAIAssistantMessage(
					conversationId,
					userMessage,
				);
				messages = [...messages, { type: "ai", text: response }];
				isLoading = false;
			} catch (error) {
				console.error("Error handling AI message:", error);
				isLoading = false;
			}
		}
	}

	async function handleAIAssistantMessage(conversationId, message) {
		const { baseUrl, actions } = config.integrationsApi;
		const { url: apiPath } = actions.handleAIAssistantConversation;

		const finalUrl = `${baseUrl}${apiPath}${conversationId}`;
		const headers = { "Content-Type": "application/json;charset=UTF-8" };
		const params = {
			headers,
			body: JSON.stringify({
				message,
				isStreamResponse: true,
				role: "user",
			}),
		};

		try {
			const response = await fetch(finalUrl, { method: "POST", ...params });
			return await response.text();
		} catch (error) {
			console.error("Error handling message:", error);
			throw error;
		}
	}

	function handleInputChange(event) {
		input = event.target.value;
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	}

	function handleClose() {
		isVisible = false;
	}

	function toggleVisibility() {
		isVisible = !isVisible;
	}
</script>

{#if !isVisible}
	<button class="toggle-chat-button" on:click={toggleVisibility}> Chat </button>
{/if}

{#if isVisible}
	<div class="chat-with-ai-container resizable">
		<div class="chat-with-ai-title">
			<span>Chat with {aiAgentName}</span>
			<button
				on:click={handleClose}
				style="background: none; border: none; color: #fff; font-size: 1rem; cursor: pointer;"
				>x</button>
		</div>
		<div class="chat-with-ai-content">
			{#each messages as message, index}
				<div class={message.type === "user" ? "user-message" : "ai-message"}>
					{message.text}
				</div>
			{/each}
			{#if isLoading}
				<div class="ai-message">Thinking...</div>
			{/if}
		</div>
		<div class="chat-with-ai-bottom">
			<input
				type="text"
				bind:value={input}
				on:input={handleInputChange}
				on:keydown={handleKeyPress}
				placeholder="Type a message..." />
			<button on:click={handleSendMessage}>Send</button>
		</div>
	</div>
{/if}

<style>
	.toggle-chat-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: #D9B86A;
		color: #fff;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.3s;
		z-index: 11;
	}

	.toggle-chat-button:hover {
		background-color: #d33440;
	}

	.chat-with-ai-container {
		position: fixed;
		bottom: 80px;
		right: 20px;
		max-height: 45%;
		max-width: 30%;
		width: 100%;
		background-color: #1a1a1a;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		font-family: "Arial", sans-serif;
		color: #fff;
		z-index: 10;
		resize: both;
		overflow: auto;
	}

	.chat-with-ai-title {
		background-color: #1a1a1a;
		color: #fff;
		padding: 1rem;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.chat-with-ai-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		background-color: #2c2c2c;
	}

	.chat-with-ai-bottom {
		padding: 0.5rem;
		background-color: #1a1a1a;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		display: flex;
		align-items: center;
	}

	.chat-with-ai-bottom > input {
		flex: 1;
		padding: 0.5rem;
		border: none;
		border-radius: 8px;
		background-color: #3c3c3c;
		color: #fff;
		margin-right: 0.5rem;
	}

	.chat-with-ai-bottom > button {
		background-color: #D9B86A;
		color: #fff;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.3s;
	}

	.chat-with-ai-bottom > button:hover {
		background-color: #D9B86A;
	}

	.user-message {
		background-color: #4a4a4a;
		color: #fff;
		padding: 0.75rem;
		border-radius: 12px;
		margin-bottom: 0.5rem;
		align-self: flex-end;
		max-width: 80%;
		text-align: right;
		word-wrap: break-word;
	}

	.ai-message {
		background-color: #D9B86A;
		color: #fff;
		padding: 0.75rem;
		border-radius: 12px;
		margin-bottom: 0.5rem;
		align-self: flex-start;
		max-width: 80%;
		word-wrap: break-word;
	}
</style>
