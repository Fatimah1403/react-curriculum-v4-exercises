import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [workingOptionText, setWorkingOptionText] = useState('');

  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    if (isEditing) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    } else {
      setWorkingText(question.question);
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );
    if (confirmed) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { id: question.id },
      });
    }
  };
  const handleAddOption = () => {
    const optionText = prompt('Enter new option text:');
    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText: optionText.trim() },
      });
    }
  };
  const handleEditOption = (index) => {
    setEditingOptionIndex(index);
    setWorkingOptionText(question.options[index]);
  };

  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptionText,
      },
    });
    setEditingOptionIndex(null);
    setWorkingOptionText('');
  };

  const handleDeleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex: index },
    });
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* Edit button toggles between "Edit" and "Cancel" */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Question content — shows edit form when editing, text when not */}
      <div className={styles['question-content']}>
        {isEditing ? (
          // Edit mode: show input with current text pre-filled
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              style={{ width: '100%', marginBottom: '8px' }}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEdit} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        ) : (
          // View mode: just show the question text
          <h3>{question.question}</h3>
        )}
      </div>

      {/* Options section — only for multiple-choice questions */}
      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing && editingOptionIndex === index ? (
                  // Editing this specific option
                  <div>
                    <input
                      type="text"
                      value={workingOptionText}
                      onChange={(e) => setWorkingOptionText(e.target.value)}
                    />
                    <button onClick={() => handleSaveOption(index)}>
                      Save
                    </button>
                    <button
                      onClick={() => setEditingOptionIndex(null)}
                      style={{ marginLeft: '4px' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // Viewing this option
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span className={styles['option-text']}>{option}</span>
                    {isEditing && (
                      <>
                        <button onClick={() => handleEditOption(index)}>
                          Edit
                        </button>
                        {/* Disabled when only 2 options remain — minimum enforced */}
                        <button
                          onClick={() => handleDeleteOption(index)}
                          disabled={question.options.length <= 2}
                          title={
                            question.options.length <= 2
                              ? 'Minimum 2 options required'
                              : 'Delete option'
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Add new option button — only shows in edit mode */}
          {isEditing && <button onClick={handleAddOption}>+ Add Option</button>}
        </div>
      )}
    </div>
  );
}
