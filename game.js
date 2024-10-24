class StoryNode {
    constructor(description) {
        this.description = description;
        this.choices = [];
    }

    addChoice(optionText, nextNode) {
        this.choices.push({ optionText, nextNode });
    }
}

class AdventureGame {
    constructor() {
        this.initializeStory();
        this.currentNode = this.startNode;
        this.displayStory();
    }

    initializeStory() {
        // Prologue (1-5)
        const node1 = new StoryNode("You arrive in the last city on Earth. The air is thick with tension. You need to uncover a conspiracy.");
        const node2 = new StoryNode("You meet a beggar who offers you help. Do you trust him?");
        const node3 = new StoryNode("You decide to help the beggar. He gives you valuable information.");
        const node4 = new StoryNode("You ignore the beggar. He curses you as you walk away.");
        const node5 = new StoryNode("You must choose where to begin your investigation: the Old Factory or the Government Building.");

        // Choices
        node1.addChoice("Talk to the beggar", node2);
        node1.addChoice("Ignore the beggar", node4);

        node2.addChoice("Help the beggar", node3);
        node2.addChoice("Ignore the beggar", node4);

        node3.addChoice("Go to the Old Factory", node6);
        node3.addChoice("Go to the Government Building", node7);

        node4.addChoice("Go to the Old Factory", node6);
        node4.addChoice("Go to the Government Building", node7);

        // Act 1 (6-20)
        const node6 = new StoryNode("You arrive at the Old Factory. It looks abandoned, but you hear noises inside.");
        const node7 = new StoryNode("The Government Building is heavily guarded. You might need a disguise.");
        const node8 = new StoryNode("You notice strange symbols around the factory. They seem to be part of some code.");
        const node9 = new StoryNode("A shadowy figure watches you from afar, disappearing when you approach.");
        const node10 = new StoryNode("Inside the factory, you find a hidden door. It's locked.");
        
        node6.addChoice("Enter the factory", node10);
        node6.addChoice("Investigate the symbols", node8);
        node6.addChoice("Leave the area", node9);

        node7.addChoice("Look for a disguise", node11);
        node7.addChoice("Try to sneak in", node12);

        const node11 = new StoryNode("You find a discarded uniform. It might help you get inside the Government Building.");
        const node12 = new StoryNode("You try to sneak in, but you're caught by a guard. You need to find another way.");

        node11.addChoice("Wear the uniform and sneak in", node13);
        node12.addChoice("Talk your way in", node14);

        const node13 = new StoryNode("You sneak inside the Government Building unnoticed.");
        const node14 = new StoryNode("You convince the guard you're an inspector and gain entry.");

        // More nodes can be added here following this pattern...

        // Connect nodes to initialize the story
        this.startNode = node1;
    }

    displayStory() {
        const storyTextDiv = document.getElementById("story-text");
        const choicesDiv = document.getElementById("choices");

        // Display the story description
        storyTextDiv.textContent = this.currentNode.description;

        // Clear any previous choices
        choicesDiv.innerHTML = '';

        // Display the choices as buttons
        this.currentNode.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.optionText;
            button.onclick = () => {
                this.currentNode = choice.nextNode;
                this.displayStory();
            };
            choicesDiv.appendChild(button);
        });
    }
}

// Start the game
const game = new AdventureGame();
