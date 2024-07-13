import React, { useState } from 'react'
import { Menu, Dialog, DialogPanel, DialogTitle, Description, MenuItem } from '@headlessui/react'
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

type Props = {
  id: number;
  name?: string;
  description?: string;
};

export default function CustomKPICard({ name, description }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const confirmDelete = () => {
    console.log('Delete button confirmed')
    // Perform the delete action here
    closeModal()
  }

  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="border border-gray-200 p-6 rounded-lg relative">
        <div className="flex justify-between items-center mb-4">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          {/* Options button */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
              className="inline-flex items-center gap-2 rounded-md bg-transparent text-gray-500 focus:outline-none hover:text-gray-700">
              <EllipsisHorizontalIcon className="w-6 h-6" />
            </Menu.Button>
            <Menu.Items
              className="absolute right-0 mt-2 w-52 origin-top-right rounded-lg border border-gray-200 bg-white p-1 text-sm text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-0 scale-95 data-[open]:opacity-100 data-[open]:scale-100">
              <div className="py-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus ? 'bg-gray-100' : ''
                      } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3`}
                      onClick={() => console.log('Edit button clicked')}
                    >
                      <PencilIcon className="w-4 h-4 text-gray-500" />
                      Edit
                      <kbd className="ml-auto hidden font-sans text-xs text-gray-400 group-data-[focus]:inline">⌘E</kbd>
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus ? 'bg-gray-100' : ''
                      } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3`}
                      onClick={openModal}
                    >
                      <TrashIcon className="w-4 h-4 text-gray-500" />
                      Delete
                      <kbd className="ml-auto hidden font-sans text-xs text-gray-400 group-data-[focus]:inline">⌘D</kbd>
                    </button>
                  )}
                </MenuItem>
              </div>
            </Menu.Items>
          </Menu>
        </div>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{name}</h2>
        <p className="leading-relaxed text-base">
          {description}
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogPanel className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded max-w-sm mx-auto p-6 space-y-4">
            <DialogTitle className="text-lg font-medium text-gray-900">Confirm Delete</DialogTitle>
            <Description className="text-sm text-gray-500">
              Are you sure you want to delete this item? This action cannot be undone.
            </Description>
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal}
                      className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={confirmDelete}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
