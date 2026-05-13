/**
 * @botamation/ui — Design System Component Library
 *
 * Import styles in your app entry:
 *   import '@botamation/ui/styles';
 */

// ── Styles (tokens must load first) ─────────────────────────
import './styles/tokens.css';

// ── Button ───────────────────────────────────────────────────
export { default as Button } from './components/Button';

// ── Typography ───────────────────────────────────────────────
export {
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Heading,
  Subheading,
  Text,
  Label,
  Caption,
  Overline,
  Code,
} from './components/Typography';

// ── Input / TextBox ──────────────────────────────────────────
export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Input,
  Textarea,
} from './components/Input';

// ── Dropdown ─────────────────────────────────────────────────
export {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  DropdownSection,
  DropdownHeading,
  DropdownDivider,
  DropdownLabel,
  DropdownDescription,
  DropdownSeparator,
} from './components/Dropdown';

// ── Header ───────────────────────────────────────────────────
export {
  Header,
  HeaderStart,
  HeaderCenter,
  HeaderEnd,
  HeaderBrand,
  HeaderNav,
  HeaderNavLink,
  HeaderDivider,
} from './components/Header';

// ── Grid / Layout ────────────────────────────────────────────
export {
  Container,
  Section,
  Row,
  Col,
  Grid,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from './components/Grid';

// ── Radio ────────────────────────────────────────────────────
export {
  RadioGroup,
  Radio,
  RadioCard,
} from './components/Radio';

// ── Combobox / Select ────────────────────────────────────────
export {
  Combobox,
  Select,
} from './components/Combobox';

// ── Sidebar ──────────────────────────────────────────────────
export {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarDivider,
  SidebarSpacer,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
} from './components/Sidebar';

// ── SidebarLayout ────────────────────────────────────────────
export { SidebarLayout } from './components/SidebarLayout';

// ── Navbar ───────────────────────────────────────────────────
export {
  Navbar,
  NavbarDivider,
  NavbarSection,
  NavbarSpacer,
  NavbarItem,
  NavbarLabel,
} from './components/Navbar';

// ── Avatar ───────────────────────────────────────────────────
export { Avatar, AvatarButton } from './components/Avatar';

// ── Switch ───────────────────────────────────────────────────
export { Switch, SwitchField, SwitchGroup } from './components/Switch';

// ── Dialog ───────────────────────────────────────────────────
export { Dialog, ConfirmationDialog } from './components/Dialog';
export { DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react';

// ── Menu (raw Headless UI) ───────────────────────────────────
export { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

// ── NavDropdown (CSS-token dropdown for Header/AppNavbar) ────
export {
  NavDropdown,
  NavDropdownItem,
  NavDropdownSeparator,
  NavDropdownHeading,
} from './components/NavDropdown';

// ── AccountCombobox (dark header account switcher) ───────────
export { AccountCombobox } from './components/AccountCombobox';

// ── Toggle ───────────────────────────────────────────────────
export { Toggle } from './components/Toggle';

// ── Badge ────────────────────────────────────────────────────
export { Badge } from './components/Badge';
