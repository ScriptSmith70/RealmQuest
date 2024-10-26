// Define a class for each story node
class StoryNode {
    constructor(description) {
        this.description = description;
        this.choices = [];
    }

    addChoice(optionText, nextNode) {
        this.choices.push({ optionText, nextNode });
    }
}

// Define the main game class
class AdventureGame {
    constructor() {
        this.initializeStory();
        this.currentNode = this.startNode;
        this.displayStory();
    }

    initializeStory() {
        // Simple two-node setup for testing
        const node1 = new StoryNode("You arrive in the last city. Choose your path.");
        const node2 = new StoryNode("You are at a crossroads. Do you return to the city or explore further?");

        node1.addChoice("Go to the crossroads", node2);
        node2.addChoice("Return to the city", node1);

        this.startNode = node1;
    }

    displayStory() {
        const storyTextDiv = document.getElementById("story-text");
        const choicesDiv = document.getElementById("choices");

        storyTextDiv.textContent = this.currentNode.description;
        choicesDiv.innerHTML = '';

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
