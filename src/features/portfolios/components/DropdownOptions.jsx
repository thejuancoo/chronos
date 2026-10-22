import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { usePortfolios } from '../../../shared/context/PortfolioContext'
import { toast } from 'sonner'

export default function DropdownOptions({ idPortfolio }) {
    const { dropPortfolio } = usePortfolios()
    const classNameOptions = "size-4"
    const optionsButton = [
        {
            id: 1,
            name: "Editar",
            icon: <PencilIcon className={classNameOptions}/>
        },
        {
            id: 2,
            name: "Duplicar",
            icon: <Square2StackIcon className={classNameOptions}/>
        },
        {
            id: 3,
            name: "Eliminar",
            icon: <TrashIcon className={classNameOptions}/>
        }
    ]

    return (
        <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-200 data-open:bg-gray-200">
                <EllipsisHorizontalIcon className="size-7 text-gray-900"/>
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl bg-white border border-gray-200 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
                {optionsButton.map((option) => (
                    <MenuItem key={option.id}>
                        <button 
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100 hover:cursor-pointer"
                            onClick={ async () => {
                                switch (option.id) {
                                    case 1:
                                        console.log("Editar")
                                        break
                                    case 2:
                                        console.log("Duplicar");
                                        break
                                    case 3:
                                        const result = await dropPortfolio(idPortfolio)
                                        toast.success(result.message)
                                        break
                                }               
                            }}
                        >
                        {option.icon}
                        {option.name}
                        {/* <kbd className="ml-auto hidden font-sans text-xs text-black group-data-focus:inline">E</kbd> */}
                        </button>   
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}
