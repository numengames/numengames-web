<script lang="ts">
	import { onMount } from "svelte";

	interface Message {
		type: "ai" | "user";
		text: string;
	}

	let isVisible: boolean = false;
	let aiAgentName: string = "Procyon";
	let input: string = "";
	let isLoading: boolean = false;
	// §9.7: a failure is never mute — it says what happened and what to do.
	let hasError: boolean = false;
	let conversationId: string | null = null;
	let messages: Message[] = [
		{
			type: "ai",
			text: `Gm! I'm a Digital Agent named ${aiAgentName}, How can I assist you today?`,
		},
	];

	const config = {
		integrationsApi: {
			baseUrl: import.meta.env.PUBLIC_AI_API_URL,
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
					id: import.meta.env.PUBLIC_AI_ASSISTANT_ID,
				},
			}),
		};

		try {
			await fetch(finalUrl, { method: "POST", ...params });
		} catch {
			hasError = true;
		}
	}

	async function handleSendMessage() {
		const userMessage = input.trim();
		if (userMessage && conversationId) {
			messages = [...messages, { type: "user", text: userMessage }];
			hasError = false;
			input = "";
			isLoading = true;

			try {
				const response = await handleAIAssistantMessage(conversationId, userMessage);
				messages = [...messages, { type: "ai", text: response }];
				isLoading = false;
			} catch {
				hasError = true;
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

		const response = await fetch(finalUrl, { method: "POST", ...params });
		return await response.text();
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
			<button on:click={handleClose} style="background: none; border: none; color: #F9EBDC; font-size: 1rem; cursor: pointer;">x</button>
		</div>
		<div class="chat-with-ai-content">
			{#each messages as message, index (index)}
				<div class={message.type === "user" ? "user-message" : "ai-message"}>
					{message.text}
				</div>
			{/each}
			{#if isLoading}
				<div class="ai-message">Thinking...</div>
			{/if}
			{#if hasError}
				<div class="error-message" role="status">The assistant is not answering right now. Try again in a moment, or write to hello@numen.games.</div>
			{/if}
		</div>
		<div class="chat-with-ai-bottom">
			<input type="text" bind:value={input} on:input={handleInputChange} on:keydown={handleKeyPress} placeholder="Type a message..." />
			<button on:click={handleSendMessage}>Send</button>
		</div>
	</div>
{/if}

<style>
	.toggle-chat-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: #017c8d;
		color: #f9ebdc;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: var(--radio-control, 6px);
		cursor: pointer;
		font-weight: 500;
		transition: background-color 120ms cubic-bezier(0.2, 0, 0, 1);
		z-index: 11;
	}

	.toggle-chat-button:hover {
		background-color: #016e7d;
	}

	.chat-with-ai-container {
		position: fixed;
		bottom: 80px;
		right: 20px;
		max-height: 45%;
		max-width: 30%;
		width: 100%;
		background-color: #1e1a17;
		border-radius: var(--radio-marco, 8px);
		border: 1px solid #3a332d;
		display: flex;
		flex-direction: column;
		font-family: var(--sans, "Geist", sans-serif);
		color: #f9ebdc;
		z-index: 10;
		resize: both;
		overflow: auto;
	}

	.chat-with-ai-title {
		background-color: #1e1a17;
		color: #f9ebdc;
		padding: 1rem;
		border-top-left-radius: var(--radio-marco, 8px);
		border-top-right-radius: var(--radio-marco, 8px);
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
		background-color: #292420;
	}

	.chat-with-ai-bottom {
		padding: 0.5rem;
		background-color: #1e1a17;
		border-bottom-left-radius: var(--radio-marco, 8px);
		border-bottom-right-radius: var(--radio-marco, 8px);
		display: flex;
		align-items: center;
	}

	.chat-with-ai-bottom > input {
		flex: 1;
		padding: 0.5rem;
		border: none;
		border-radius: var(--radio-control, 6px);
		background-color: #3a332d;
		color: #f9ebdc;
		margin-right: 0.5rem;
	}

	.chat-with-ai-bottom > button {
		background-color: #017c8d;
		color: #f9ebdc;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: var(--radio-control, 6px);
		cursor: pointer;
		font-weight: 500;
		transition: background-color 120ms cubic-bezier(0.2, 0, 0, 1);
	}

	.chat-with-ai-bottom > button:hover {
		background-color: #016e7d;
	}

	.chat-with-ai-bottom > button:active {
		background-color: #015866;
	}

	.user-message {
		background-color: #3a332d;
		color: #f9ebdc;
		padding: 0.75rem;
		border-radius: var(--radio-marco, 8px);
		margin-bottom: 0.5rem;
		align-self: flex-end;
		max-width: 80%;
		text-align: right;
		word-wrap: break-word;
	}

	.error-message {
		background-color: #292420;
		border-left: 2px solid #f35059;
		color: #f9ebdc;
		padding: 0.75rem;
		border-radius: var(--radio-marco, 8px);
		margin-bottom: 0.5rem;
		align-self: flex-start;
		max-width: 80%;
		word-wrap: break-word;
	}

	.ai-message {
		background-color: #292420;
		border-left: 2px solid #efa517;
		color: #f9ebdc;
		padding: 0.75rem;
		border-radius: var(--radio-marco, 8px);
		margin-bottom: 0.5rem;
		align-self: flex-start;
		max-width: 80%;
		word-wrap: break-word;
	}
</style>
