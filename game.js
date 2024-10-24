// Define the StoryNode class to represent each node
class StoryNode {
    constructor(description) {
        this.description = description;
        this.options = [];
        this.nextNodes = [];
    }

    // Add a choice with a link to the next node
    addChoice(option, nextNode) {
        this.options.push(option);
        this.nextNodes.push(nextNode);
    }

    // Get the next node based on the player's choice
    getNextNode(choice) {
        const index = this.options.indexOf(choice);
        if (index !== -1) {
            return this.nextNodes[index];
        }
        return null;
    }
}

class AdventureGame {
    constructor() {
        this.initializeStory();
        this.currentNode = this.startNode;
        this.displayStory();
    }

    // Initialize all nodes and build the story
    initializeStory() {
        // PROLOGUE (Nodes 1-5)
        const node1 = new StoryNode("You arrive in the last city on Earth. The air is thick with tension. You need to uncover a conspiracy.");
        const node2 = new StoryNode("You meet a beggar who offers you help. Do you trust him?");
        const node3 = new StoryNode("You decide to help the beggar. He gives you valuable information.");
        const node4 = new StoryNode("You ignore the beggar. He curses you as you walk away.");
        const node5 = new StoryNode("You must choose where to begin your investigation: the Old Factory or the Government Building.");
        
        node1.addChoice("Talk to the beggar", node2);
        node1.addChoice("Ignore the beggar", node4);

        node2.addChoice("Help the beggar", node3);
        node2.addChoice("Ignore the beggar", node4);

        node3.addChoice("Go to the Old Factory", node6);
        node3.addChoice("Go to the Government Building", node7);

        node4.addChoice("Go to the Old Factory", node6);
        node4.addChoice("Go to the Government Building", node7);

        // ACT 1: INVESTIGATION BEGINS (Nodes 6-20)
        const node6 = new StoryNode("You arrive at the Old Factory. It looks abandoned, but you hear noises inside.");
        const node7 = new StoryNode("The Government Building is heavily guarded. You might need a disguise.");
        const node8 = new StoryNode("You notice strange symbols around the factory. They seem to be part of some code.");
        const node9 = new StoryNode("A shadowy figure watches you from afar, disappearing when you approach.");
        const node10 = new StoryNode("Inside the factory, you find a hidden door. It's locked.");
        const node11 = new StoryNode("You find a security guard who is willing to help for a price.");
        const node12 = new StoryNode("You find a discarded uniform. It might help you get inside the Government Building.");
        const node13 = new StoryNode("You try to sneak into the Government Building but are caught by a guard. You need to find another way.");
        const node14 = new StoryNode("The symbols around the factory reveal a hidden message: 'The truth lies underground.'");
        const node15 = new StoryNode("You confront the figure, but they disappear into the shadows.");
        const node16 = new StoryNode("You unlock the door inside the factory and discover a hidden passage leading to an underground facility.");

        node6.addChoice("Enter the factory", node10);
        node6.addChoice("Investigate the symbols", node8);
        node6.addChoice("Leave the area", node9);

        node7.addChoice("Look for a disguise", node12);
        node7.addChoice("Try to sneak in", node13);

        node8.addChoice("Decode the symbols", node14);
        node8.addChoice("Ignore the symbols", node9);

        node9.addChoice("Follow the figure", node15);
        node9.addChoice("Stay hidden", node6);

        node10.addChoice("Try to unlock the door", node16);
        node10.addChoice("Search the factory", node9);

        node12.addChoice("Use the uniform to sneak in", node18);
        node12.addChoice("Continue without a disguise", node13);

        node13.addChoice("Talk your way in", node19);
        node13.addChoice("Fight the guard", node20);

        // Set the starting node
        this.startNode = node1;
    }

    // Display the current story node and available choices
    displayStory() {
        const storyText = document.getElementById("story-text");
        storyText.textContent = this.currentNode.description;

        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = '';

        // Create buttons for each choice
        this.currentNode.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => this.makeChoice(option);
            choicesDiv.appendChild(button);
        });
    }

    // Handle player's choice and move to the next node
    makeChoice(choice) {
        const nextNode = this.currentNode.getNextNode(choice);
        if (nextNode) {
            this.currentNode = nextNode;
            this.displayStory();
        } else {
            alert("Invalid choice");
        }
    }
}

// Start the game
const game = new AdventureGame();
