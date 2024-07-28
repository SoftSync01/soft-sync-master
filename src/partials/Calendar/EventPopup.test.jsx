import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventPopup from './EventPopup'

const mockEvent = 
{ title: 'event 2', date: '2024-07-18' }


describe('EventPopup', () => {
    it('should render the "Add Event" title', () => {
        render(<EventPopup title="Add Event" />) // ARRANGE

        //ACT
        const title = screen.getByRole('simple-modal-title', {
            name: "Add Event"
        })
    })
})