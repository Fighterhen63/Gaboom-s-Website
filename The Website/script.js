document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});

// Pin Board Functionality
// Pin Board Functionality
document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const newNoteText = document.getElementById('new-note-text');
    const addNoteBtn = document.getElementById('add-note-btn');

    let notes = JSON.parse(localStorage.getItem('pinBoardNotes')) || [];

    function saveNotes() {
        localStorage.setItem('pinBoardNotes', JSON.stringify(notes));
    }

    function createNoteElement(note) {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.style.backgroundColor = note.color || '#feff9c';
        noteEl.innerHTML = `
            <div class="note-content">
                <p>${note.text}</p>
            </div>
            <div class="note-footer">
                <input type="color" class="color-picker" value="${note.color || '#feff9c'}">
                <button class="delete-note">×</button>
            </div>
        `;

        const colorPicker = noteEl.querySelector('.color-picker');
        colorPicker.addEventListener('change', (e) => {
            note.color = e.target.value;
            noteEl.style.backgroundColor = note.color;
            saveNotes();
        });

        noteEl.querySelector('.delete-note').addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();
        });

        // noteEl.querySelector('.send-message').addEventListener('click', () => {
        //     sendNoteToEmail(note);
        // });
        return noteEl;
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            notesContainer.appendChild(createNoteElement(note));
        });
    }

    addNoteBtn.addEventListener('click', () => {
        const noteText = newNoteText.value.trim();
        if (noteText) {
            const newNote = {
                id: Date.now(),
                text: noteText,
                color: '#feff9c' // Default color
            };
            notes.push(newNote);
            saveNotes();
            renderNotes();
            newNoteText.value = '';
        }
    });

    function sendNoteToEmail(note) {
        // Replace 'your-email@example.com' with your actual email address
        const email = 'fighterhen63@gmail.com';
        const subject = 'New Note from Pin Board';
        const body = `Note Content: ${note.text}`;

        // Create the mailto URL
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the default email client
        window.open(mailtoUrl, '_blank');
    }
    renderNotes();
});

