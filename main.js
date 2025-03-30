        document.addEventListener('DOMContentLoaded', () => {
            const generateButton = document.getElementById('generate');
            const promptInput = document.getElementById('prompt');
            const outputDiv = document.getElementById('output');
            const statusElement = document.getElementById('status');
            
            let pipeline = null;
            
            generateButton.addEventListener('click', async () => {
                const prompt = promptInput.value.trim();
                
                if (!prompt) {
                    alert('Please enter a prompt');
                    return;
                }
                
                // Disable the button and update status while processing
                generateButton.disabled = true;
                
                try {
                    // Load the pipeline if it hasn't been loaded yet
                    if (!pipeline) {
                        statusElement.textContent = 'Loading Qwen2.5-0.5B model... This might take a while for the first time.';
                        pipeline = await window.pipeline('text-generation', 'Qwen/Qwen2.5-0.5B');
                        statusElement.textContent = 'Model loaded successfully!';
                    } else {
                        statusElement.textContent = 'Generating text...';
                    }
                    
                    // Generate text
                    outputDiv.textContent = 'Generating...';
                    
                    // Format prompt for Qwen models which may require specific formatting
                    const formattedPrompt = prompt; 
                    
                    const result = await pipeline(formattedPrompt, {
                        max_new_tokens: 128,
                        temperature: 0.7,
                        top_p: 0.9,
                        repetition_penalty: 1.1,
                        do_sample: true
                    });
                    
                    // Display the result
                    outputDiv.textContent = result[0].generated_text;
                    statusElement.textContent = 'Generation complete!';
                    
                } catch (error) {
                    console.error('Error:', error);
                    statusElement.textContent = `Error: ${error.message}`;
                    outputDiv.textContent = 'An error occurred during text generation.';
                } finally {
                    // Re-enable the button
                    generateButton.disabled = false;
                }
            });
        });
