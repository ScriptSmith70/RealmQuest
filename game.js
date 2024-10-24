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
        return this.nextNodes[index] || null;
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
        const node6 = new StoryNode("You arrive at the Old Factory. It looks abandoned but you hear noises inside.");
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

        // ACT 2: THE CONSPIRACY UNFOLDS (Nodes 21-40)
        const node18 = new StoryNode("You sneak into the Government Building and find a room filled with confidential documents.");
        const node19 = new StoryNode("You convince the guard you're an inspector and gain entry.");
        const node20 = new StoryNode("You fight the guard and escape. You're now a wanted fugitive.");

        const node21 = new StoryNode("Inside the underground facility, you discover evidence of illegal human experiments.");
        const node22 = new StoryNode("You overhear a conversation between two officials about a mind-control device.");
        const node23 = new StoryNode("The documents reveal that a secret group is controlling the government and conducting experiments on citizens.");
        const node24 = new StoryNode("You find blueprints for a mind-control device that will be used to control the entire city.");

        const node25 = new StoryNode("You confront a key figure in the conspiracy. They deny everything.");
        const node26 = new StoryNode("You find a scientist working on the mind-control device. They beg for their life.");
        const node27 = new StoryNode("The scientist offers to help you if you spare them.");

        node16.addChoice("Enter the underground facility", node21);
        node16.addChoice("Leave the factory", node9);

        node18.addChoice("Search the documents", node23);
        node18.addChoice("Leave the room", node22);

        node19.addChoice("Investigate further", node24);
        node19.addChoice("Leave the building", node9);

        node21.addChoice("Investigate the experiments", node26);
        node21.addChoice("Destroy the facility", node27);

        node22.addChoice("Eavesdrop", node25);
        node22.addChoice("Leave the area", node9);

        node23.addChoice("Take the documents", node24);
        node23.addChoice("Destroy the documents", node25);

        node25.addChoice("Press for information", node26);
        node25.addChoice("Let the figure go", node9);

        // ACT 3: THE FINAL CONFRONTATION (Nodes 41-50)
        const node28 = new StoryNode("You decide to go public with your findings, but the conspiracy is onto you.");
        const node29 = new StoryNode("The mind-control device is nearly complete. You must stop it before it's activated.");
        const node30 = new StoryNode("You confront the leader of the conspiracy. They offer you a deal: join them, or die.");
        const node31 = new StoryNode("You gather evidence and go public, exposing the conspiracy to the media.");
        const node32 = new StoryNode("The conspiracy fights back, trying to silence you.");
        const node33 = new StoryNode("You manage to rally support from citizens and bring down the government.");
        const node34 = new StoryNode("The conspiracy crumbles, but at a great personal cost.");
        const node35 = new StoryNode("You fail to stop the conspiracy in time. The mind-control device is activated.");
        const node36 = new StoryNode("The city is under complete control of the conspiracy. The citizens are enslaved.");
        const node37 = new StoryNode("You destroy the mind-control device, freeing the city from the conspiracy’s grip.");
        const node38 = new StoryNode("The conspiracy leader is arrested. Justice is served, but the scars remain.");
        const node39 = new StoryNode("The city is free, but you are left to reflect on the cost of victory.");
        const node40 = new StoryNode("You decide to leave the city, your journey complete, but the world forever changed.");

        node24.addChoice("Go public", node28);
        node24.addChoice("Stay in the shadows", node29);

        node25.addChoice("Confront the leader", node30);
        node25.addChoice("Gather more evidence", node31);

        node26.addChoice("Spare the scientist", node32);
        node26.addChoice("Kill the scientist", node33);

        node27.addChoice("Destroy the facility", node34);
        node27.addChoice("Let it continue", node35);

        node28.addChoice("Expose the conspiracy", node33);
        node28.addChoice("Stay silent", node36);

        node29.addChoice("Destroy the mind-control device", node37);
        node29.addChoice("Let it activate", node35);

        node30.addChoice("Join the conspiracy", node36);
        node30.addChoice("Refuse the deal", node38);

        node31.addChoice("Expose the conspiracy", node39);
        node31.addChoice("Stay quiet", node40);

        // Set the starting node
        this.startNode = node1;
    }

    // Display the current story node and available choices
    displayStory() {
        const storyText = document.getElementById("story-text");
        storyText.textContent = this.currentNode.description;

        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = '';

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
