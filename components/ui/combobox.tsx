"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { buildUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "@/types"

export function Combobox({
    onValueSelect
}: {
    onValueSelect: (value: User) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<User | undefined>()
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const result = await fetch(buildUrl('user'), {
          cache: 'no-cache'
        })

        if (!result.ok) {
          throw new Error('Failed to fetch users')
        }

        const fetchedUsers = await result.json()
        console.log('Fetched users:', fetchedUsers) // Log fetched data

        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers)
        } else {
          console.error('Fetched data is not an array:', fetchedUsers)
          setUsers([])
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, []);

  const handleSelect = (currentValue: string) => {
    const user = users.find(u => u.fullName.toLowerCase() === currentValue.toLowerCase())
    if (user) {
      onValueSelect(user)
      setValue(user)
      setOpen(false)
    }
  }

  // Safeguard against undefined users
  const safeUsers = users || []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? value.fullName
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {loading ? (
              <CommandItem>Loading...</CommandItem>
            ) : safeUsers.length === 0 ? (
              <CommandItem>No users available</CommandItem>
            ) : (
              safeUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelect(user.fullName)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.fullName}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}