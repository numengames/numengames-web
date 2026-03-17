const Title = ({ children, highlight }) => {
	const parts = children.split(" ");
	return (
		<h1 class="text-4xl font-medium leading-[4.8rem] tracking-tight text-left text-primary-beige">
			{parts.map((word, index) =>
				highlight.includes(word) ? (
					<span key={index} class="text-primary-coralRed">
						{word}
					</span>
				) : (
					<span key={index}>{word}</span>
				)
			)}
		</h1>
	);
};

export default Title;
